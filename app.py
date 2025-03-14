from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
from typing import Optional
from flask_socketio import SocketIO, emit, join_room
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required

app = Flask(__name__)
CORS(app) 

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///interviews.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this in production

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='interviewer')  # admin or interviewer
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'role': self.role,
            'created_at': self.created_at.isoformat()
        }

class Interviewer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    expertise = db.Column(db.String(100), nullable=False)
    availability = db.Column(db.JSON)  # Store weekly availability
    max_interviews_per_day = db.Column(db.Integer, default=3)
    active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    interviews = db.relationship('Interview', backref='interviewer', lazy=True)

    def to_dict(self):
        interview_count = len([i for i in self.interviews if i.status == 'Completed'])
        avg_rating = 0
        if interview_count > 0:
            ratings = [i.feedback.overall_rating for i in self.interviews 
                      if i.feedback and i.status == 'Completed']
            avg_rating = sum(ratings) / len(ratings) if ratings else 0
        
        return {
            'id': self.id,
            'name': self.name,
            'expertise': self.expertise,
            'availability': self.availability,
            'max_interviews_per_day': self.max_interviews_per_day,
            'active': self.active,
            'total_interviews': len(self.interviews),
            'completed_interviews': interview_count,
            'average_rating': round(avg_rating, 2)
        }

class Interview(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    candidate_name = db.Column(db.String(100), nullable=False)
    interviewer_id = db.Column(db.Integer, db.ForeignKey('interviewer.id'), nullable=False)
    scheduled_at = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), default='Scheduled')
    feedback_submitted = db.Column(db.String(3), default='No')
    job_role = db.Column(db.String(100), nullable=False)
    duration = db.Column(db.String(20))
    format = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    feedback = db.relationship('Feedback', backref='interview', lazy=True, uselist=False)

    def to_dict(self):
        return {
            'id': self.id,
            'candidate_name': self.candidate_name,
            'interviewer_name': self.interviewer.name,
            'scheduled_at': self.scheduled_at.isoformat(),
            'status': self.status,
            'feedback_submitted': self.feedback_submitted,
            'job_role': self.job_role,
            'duration': self.duration,
            'format': self.format
        }

class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    interview_id = db.Column(db.Integer, db.ForeignKey('interview.id'), unique=True)
    technical_skills = db.Column(db.Float, nullable=False)
    communication_skills = db.Column(db.Float, nullable=False)
    problem_solving = db.Column(db.Float, nullable=False)
    cultural_fit = db.Column(db.Float, nullable=False)
    overall_rating = db.Column(db.Float, nullable=False)
    comments = db.Column(db.Text)
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)
    submitted_by = db.Column(db.String(100))

    def to_dict(self):
        return {
            'interview_id': self.interview_id,
            'technical_skills': self.technical_skills,
            'communication_skills': self.communication_skills,
            'problem_solving': self.problem_solving,
            'cultural_fit': self.cultural_fit,
            'overall_rating': self.overall_rating,
            'comments': self.comments,
            'submitted_at': self.submitted_at.isoformat(),
            'submitted_by': self.submitted_by
        }

# Authentication routes
@app.route('/auth/register', methods=['POST'])
def register():
    try:
        data = request.json
        if not data or not data.get('username') or not data.get('password'):
            return jsonify({"error": "Missing username or password"}), 400

        if User.query.filter_by(username=data['username']).first():
            return jsonify({"error": "Username already exists"}), 400

        hashed_password = generate_password_hash(data['password'])
        new_user = User(
            username=data['username'],
            password=hashed_password,
            role=data.get('role', 'interviewer')
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/auth/login', methods=['POST'])
def login():
    try:
        data = request.json
        if not data or not data.get('username') or not data.get('password'):
            return jsonify({"error": "Missing username or password"}), 400

        user = User.query.filter_by(username=data['username']).first()
        if not user or not check_password_hash(user.password, data['password']):
            return jsonify({"error": "Invalid username or password"}), 401

        access_token = create_access_token(identity=user.id)
        return jsonify({
            "access_token": access_token,
            "user": user.to_dict()
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Protected route example
@app.route('/auth/profile', methods=['GET'])
@jwt_required()
def profile():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get_or_404(current_user_id)
        return jsonify(user.to_dict()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# WebSocket events
@socketio.on('connect')
def handle_connect():
    emit('connection_status', {'data': 'Connected'})

@socketio.on('join_room')
def handle_join_room(data):
    room = data.get('room')
    if room:
        join_room(room)
        emit('room_status', {'data': f'Joined room: {room}'})

# Validate interview data
def validate_interview_data(data: dict) -> tuple[bool, Optional[str]]:
    """Validate interview data"""
    required_fields = ['candidateName', 'interviewer', 'date', 'time', 'jobRole']
    for field in required_fields:
        if not data.get(field):
            return False, f"Missing required field: {field}"
    
    try:
        datetime.strptime(data['date'], '%Y-%m-%d')
        datetime.strptime(data['time'], '%H:%M')
    except ValueError as e:
        return False, f"Invalid date or time format: {str(e)}"
    
    return True, None

# Validate feedback data
def validate_feedback_data(data: dict) -> tuple[bool, Optional[str]]:
    """Validate feedback data"""
    required_fields = ['technical_skills', 'communication_skills', 'problem_solving', 
                      'cultural_fit', 'overall_rating', 'comments']
    for field in required_fields:
        if field not in data:
            return False, f"Missing required field: {field}"
    
    rating_fields = ['technical_skills', 'communication_skills', 'problem_solving', 
                    'cultural_fit', 'overall_rating']
    for field in rating_fields:
        try:
            rating = float(data[field])
            if not 1 <= rating <= 5:
                return False, f"{field} must be between 1 and 5"
        except ValueError:
            return False, f"{field} must be a number"
    
    return True, None

# Routes
@app.route('/interviews', methods=['GET'])
@jwt_required()
def get_interviews():
    try:
        query = Interview.query

        # Apply filters
        status = request.args.get('status')
        if status:
            query = query.filter_by(status=status)

        interviewer = request.args.get('interviewer')
        if interviewer:
            query = query.join(Interviewer).filter(Interviewer.name == interviewer)

        search = request.args.get('search')
        if search:
            search_term = f"%{search.lower()}%"
            query = query.filter(
                db.or_(
                    Interview.candidate_name.ilike(search_term),
                    Interview.job_role.ilike(search_term)
                )
            )

        # Sort by scheduled_at in descending order
        interviews = query.order_by(Interview.scheduled_at.desc()).all()
        return jsonify([interview.to_dict() for interview in interviews]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/interviews', methods=['POST'])
@jwt_required()
def create_interview():
    try:
        data = request.json
        
        # Validate input data
        is_valid, error_message = validate_interview_data(data)
        if not is_valid:
            return jsonify({"error": error_message}), 400
        
        # Find interviewer
        interviewer = Interviewer.query.filter_by(id=int(data['interviewer'])).first()
        if not interviewer:
            return jsonify({"error": "Interviewer not found"}), 404

        # Create interview
        scheduled_at = datetime.strptime(f"{data['date']}T{data['time']}", '%Y-%m-%dT%H:%M')
        new_interview = Interview(
            candidate_name=data['candidateName'],
            interviewer_id=interviewer.id,
            scheduled_at=scheduled_at,
            job_role=data['jobRole'],
            duration=data.get('duration', ''),
            format=data.get('format', '')
        )
        
        db.session.add(new_interview)
        db.session.commit()
        
        # Emit real-time notification
        interview_data = new_interview.to_dict()
        socketio.emit('new_interview', interview_data, room=f"interviewer_{interviewer.id}")
        
        return jsonify(interview_data), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/interviews/<int:interview_id>', methods=['PUT'])
@jwt_required()
def update_interview(interview_id):
    try:
        interview = Interview.query.get_or_404(interview_id)
        data = request.json
        
        for key, value in data.items():
            if hasattr(interview, key):
                setattr(interview, key, value)
        
        db.session.commit()
        return jsonify(interview.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/interviews/<int:interview_id>/feedback', methods=['POST'])
@jwt_required()
def submit_feedback(interview_id):
    try:
        data = request.json
        is_valid, error = validate_feedback_data(data)
        if not is_valid:
            return jsonify({"error": error}), 400
        
        interview = Interview.query.get_or_404(interview_id)
        if interview.status != 'Completed':
            return jsonify({"error": "Cannot submit feedback for incomplete interview"}), 400
        
        if interview.feedback:
            return jsonify({"error": "Feedback already submitted"}), 400
        
        feedback = Feedback(
            interview_id=interview_id,
            technical_skills=float(data['technical_skills']),
            communication_skills=float(data['communication_skills']),
            problem_solving=float(data['problem_solving']),
            cultural_fit=float(data['cultural_fit']),
            overall_rating=float(data['overall_rating']),
            comments=data['comments'],
            submitted_by=interview.interviewer.name
        )
        
        interview.feedback_submitted = 'Yes'
        db.session.add(feedback)
        db.session.commit()
        
        return jsonify(feedback.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/interviews/<int:interview_id>/feedback', methods=['GET'])
@jwt_required()
def get_feedback(interview_id):
    try:
        feedback = Feedback.query.filter_by(interview_id=interview_id).first()
        if not feedback:
            return jsonify({"error": "Feedback not found"}), 404
        
        return jsonify(feedback.to_dict()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/interviews/statistics', methods=['GET'])
@jwt_required()
def get_statistics():
    try:
        total_interviews = Interview.query.count()
        completed_interviews = Interview.query.filter_by(status='Completed').count()
        scheduled_interviews = Interview.query.filter_by(status='Scheduled').count()
        
        # Calculate average ratings
        feedbacks = Feedback.query.all()
        avg_ratings = {}
        if feedbacks:
            rating_fields = ['technical_skills', 'communication_skills', 'problem_solving', 
                           'cultural_fit', 'overall_rating']
            for field in rating_fields:
                avg = sum(getattr(f, field) for f in feedbacks) / len(feedbacks)
                avg_ratings[field] = round(avg, 2)
        
        # Get interviewer statistics
        interviewer_stats = {}
        for interviewer in Interviewer.query.all():
            interviewer_stats[interviewer.name] = len(interviewer.interviews)
        
        # Get job role statistics
        job_roles = db.session.query(Interview.job_role, 
                                   db.func.count(Interview.id))\
                                   .group_by(Interview.job_role).all()
        job_role_stats = dict(job_roles)
        
        return jsonify({
            'total_interviews': total_interviews,
            'completed_interviews': completed_interviews,
            'scheduled_interviews': scheduled_interviews,
            'average_ratings': avg_ratings,
            'interviewer_stats': interviewer_stats,
            'job_role_stats': job_role_stats
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/interviews/bulk', methods=['POST'])
@jwt_required()
def create_bulk_interviews():
    try:
        interviews_data = request.json
        if not isinstance(interviews_data, list):
            return jsonify({"error": "Expected a list of interviews"}), 400
        
        created_interviews = []
        for data in interviews_data:
            is_valid, error = validate_interview_data(data)
            if not is_valid:
                return jsonify({"error": f"Invalid interview data: {error}"}), 400
            
            interviewer = Interviewer.query.filter_by(id=int(data['interviewer'])).first()
            if not interviewer:
                return jsonify({"error": f"Interviewer not found: {data['interviewer']}"}), 404
            
            scheduled_at = datetime.strptime(f"{data['date']}T{data['time']}", '%Y-%m-%dT%H:%M')
            interview = Interview(
                candidate_name=data['candidateName'],
                interviewer_id=interviewer.id,
                scheduled_at=scheduled_at,
                job_role=data['jobRole'],
                duration=data.get('duration', ''),
                format=data.get('format', '')
            )
            db.session.add(interview)
            created_interviews.append(interview)
        
        db.session.commit()
        return jsonify([interview.to_dict() for interview in created_interviews]), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/interviews/<int:interview_id>', methods=['DELETE'])
@jwt_required()
def delete_interview(interview_id):
    try:
        interview = Interview.query.get_or_404(interview_id)
        db.session.delete(interview)
        db.session.commit()
        return jsonify({"message": "Interview deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Admin Routes
@app.route('/admin/interviewers', methods=['POST'])
def add_interviewer():
    try:
        data = request.json
        new_interviewer = Interviewer(
            name=data['name'],
            expertise=data['expertise'],
            availability=data.get('availability', {}),
            max_interviews_per_day=data.get('max_interviews_per_day', 3)
        )
        db.session.add(new_interviewer)
        db.session.commit()
        return jsonify(new_interviewer.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/admin/interviewers/<int:interviewer_id>', methods=['PUT'])
def update_interviewer(interviewer_id):
    try:
        interviewer = Interviewer.query.get_or_404(interviewer_id)
        data = request.json
        
        for key, value in data.items():
            if hasattr(interviewer, key):
                setattr(interviewer, key, value)
        
        db.session.commit()
        return jsonify(interviewer.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/admin/interviewers/<int:interviewer_id>', methods=['DELETE'])
def delete_interviewer(interviewer_id):
    try:
        interviewer = Interviewer.query.get_or_404(interviewer_id)
        interviewer.active = False  # Soft delete
        db.session.commit()
        return jsonify({"message": "Interviewer deactivated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/admin/analytics', methods=['GET'])
def get_admin_analytics():
    try:
        # Date range filter
        days = int(request.args.get('days', 30))
        start_date = datetime.utcnow() - timedelta(days=days)
        
        # Get all interviews in date range
        interviews = Interview.query.filter(Interview.scheduled_at >= start_date).all()
        
        # Calculate analytics
        total_interviews = len(interviews)
        completed = len([i for i in interviews if i.status == 'Completed'])
        cancelled = len([i for i in interviews if i.status == 'Cancelled'])
        scheduled = len([i for i in interviews if i.status == 'Scheduled'])
        
        # Feedback statistics
        feedbacks = [i.feedback for i in interviews if i.feedback]
        avg_ratings = {}
        if feedbacks:
            rating_fields = ['technical_skills', 'communication_skills', 
                           'problem_solving', 'cultural_fit', 'overall_rating']
            for field in rating_fields:
                avg = sum(getattr(f, field) for f in feedbacks) / len(feedbacks)
                avg_ratings[field] = round(avg, 2)
        
        # Interviewer performance
        interviewer_stats = []
        for interviewer in Interviewer.query.filter_by(active=True).all():
            interviewer_interviews = [i for i in interviewer.interviews 
                                   if i.scheduled_at >= start_date]
            if interviewer_interviews:
                stats = {
                    'interviewer_name': interviewer.name,
                    'total_interviews': len(interviewer_interviews),
                    'completed_interviews': len([i for i in interviewer_interviews 
                                              if i.status == 'Completed']),
                    'average_rating': 0
                }
                
                # Calculate average rating
                ratings = [i.feedback.overall_rating for i in interviewer_interviews 
                         if i.feedback and i.status == 'Completed']
                if ratings:
                    stats['average_rating'] = round(sum(ratings) / len(ratings), 2)
                
                interviewer_stats.append(stats)
        
        # Job role distribution
        job_roles = {}
        for interview in interviews:
            job_roles[interview.job_role] = job_roles.get(interview.job_role, 0) + 1
        
        # Time slot analysis
        time_slots = {
            'morning': 0,   # 9AM - 12PM
            'afternoon': 0, # 12PM - 4PM
            'evening': 0    # 4PM - 7PM
        }
        for interview in interviews:
            hour = interview.scheduled_at.hour
            if 9 <= hour < 12:
                time_slots['morning'] += 1
            elif 12 <= hour < 16:
                time_slots['afternoon'] += 1
            elif 16 <= hour < 19:
                time_slots['evening'] += 1
        
        return jsonify({
            'overview': {
                'total_interviews': total_interviews,
                'completed_interviews': completed,
                'cancelled_interviews': cancelled,
                'scheduled_interviews': scheduled,
                'completion_rate': round(completed/total_interviews * 100, 2) if total_interviews else 0
            },
            'feedback_ratings': avg_ratings,
            'interviewer_performance': interviewer_stats,
            'job_role_distribution': job_roles,
            'time_slot_distribution': time_slots,
            'date_range': {
                'start_date': start_date.isoformat(),
                'end_date': datetime.utcnow().isoformat()
            }
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/admin/schedule/conflicts', methods=['GET'])
def check_schedule_conflicts():
    try:
        # Get date range
        start_date = datetime.strptime(request.args.get('start_date', 
                                     datetime.utcnow().strftime('%Y-%m-%d')), '%Y-%m-%d')
        end_date = start_date + timedelta(days=int(request.args.get('days', 7)))
        
        conflicts = []
        interviews = Interview.query.filter(
            Interview.scheduled_at.between(start_date, end_date)
        ).order_by(Interview.scheduled_at).all()
        
        for interviewer in Interviewer.query.filter_by(active=True).all():
            interviewer_interviews = [i for i in interviews if i.interviewer_id == interviewer.id]
            
            # Check for overlapping interviews
            for i in range(len(interviewer_interviews)-1):
                current = interviewer_interviews[i]
                next_interview = interviewer_interviews[i+1]
                
                current_end = datetime.strptime(f"{current.scheduled_at.strftime('%Y-%m-%d %H:%M')}", 
                                              '%Y-%m-%d %H:%M') + \
                             timedelta(minutes=int(current.duration.split()[0]))
                
                if current_end > next_interview.scheduled_at:
                    conflicts.append({
                        'interviewer_name': interviewer.name,
                        'conflict_type': 'overlap',
                        'interviews': [
                            {'id': current.id, 'time': current.scheduled_at.isoformat()},
                            {'id': next_interview.id, 'time': next_interview.scheduled_at.isoformat()}
                        ]
                    })
            
            # Check for max interviews per day
            daily_interviews = {}
            for interview in interviewer_interviews:
                date = interview.scheduled_at.date()
                daily_interviews[date] = daily_interviews.get(date, 0) + 1
                
                if daily_interviews[date] > interviewer.max_interviews_per_day:
                    conflicts.append({
                        'interviewer_name': interviewer.name,
                        'conflict_type': 'max_interviews_exceeded',
                        'date': date.isoformat(),
                        'scheduled_interviews': daily_interviews[date],
                        'max_allowed': interviewer.max_interviews_per_day
                    })
        
        return jsonify({
            'conflicts': conflicts,
            'total_conflicts': len(conflicts)
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/admin/interviews/reschedule', methods=['POST'])
def bulk_reschedule():
    try:
        data = request.json
        if not isinstance(data, list):
            return jsonify({"error": "Expected a list of interviews to reschedule"}), 400
        
        rescheduled = []
        for item in data:
            interview = Interview.query.get(item['interview_id'])
            if not interview:
                continue
            
            new_time = datetime.strptime(item['new_time'], '%Y-%m-%dT%H:%M')
            interview.scheduled_at = new_time
            rescheduled.append(interview.to_dict())
        
        db.session.commit()
        return jsonify({
            'message': f'Successfully rescheduled {len(rescheduled)} interviews',
            'rescheduled': rescheduled
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Initialize database with admin user
def init_db():
    with app.app_context():
        db.create_all()
        
        # Create admin user if not exists
        if not User.query.filter_by(username='admin').first():
            admin = User(
                username='admin',
                password=generate_password_hash('admin123'),
                role='admin'
            )
            db.session.add(admin)
            
        # Add default interviewers if they don't exist
        if not Interviewer.query.first():
            interviewers = [
                Interviewer(name='Isha Patel', expertise='Frontend Developer'),
                Interviewer(name='Michael Chen', expertise='UX Designer'),
                Interviewer(name='Alex Rivera', expertise='Product Manager')
            ]
            db.session.add_all(interviewers)
            
        db.session.commit()

# Initialize database
init_db()

if __name__ == '__main__':
    socketio.run(app, port=5000, debug=True)
