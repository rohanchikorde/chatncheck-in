# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Implemented Enterprise Solutions page with detailed sections
- Created specific solution pages for different industry verticals
- Added backend API test suite with test_api.py
- Created run_tests.sh for automated API testing
- Added comprehensive frontend-backend connection for interviews
- Improved demo request functionality
- Enhanced UI components for solutions pages
- Added testimonials and case studies to Enterprise Solutions page
- Created new UI components for landing page
- Initial implementation of demo requests.

### Fixed
- Fixed frontend-backend connection issues
- Updated API proxy configuration in Vite
- Improved error handling in API calls
- Added proper initialization files (index.html, vite.config.ts)
- Fixed demo request form submission issues
- Improved Supabase connection handling
- Enhanced error handling for Supabase requests
- Added retry mechanism for failed requests
- Resolved JSON decoding errors when handling API responses.
- Handled 401 Unauthorized errors with mock data for testing.

### Changed
- Fixed SSL verification issues in Supabase API requests.
- Enhanced error handling to return consistent response formats.
- Updated mock responses to match expected formats in unit tests.

## [1.1.0] - 2025-03-25

### Changed
- Updated project structure to modular architecture
- Renamed `server.py` to `app.py` as main entry point
- Restructured backend into clear modules:
  - `routes/` for API endpoints
  - `services/` for business logic
  - `utils/` for utility functions

### Added
- `__init__.py` files in all backend directories for proper package structure
- Improved error handling in service functions
- Better module organization for maintainability

### Fixed
- Import errors in backend modules
- Module visibility issues
- Path configuration for Python imports

## [1.1.0] - 2025-03-24

### Changed
- Moved frontend directory to root level for better project organization
- Updated Vite configuration to reflect new directory structure
- Improved import paths for better consistency

### Added
- New project structure documentation
- Updated README files in both root and frontend directories

## [1.0.0] - 2025-03-25

### Added
- Initial release of InterviewPulse platform
- Complete frontend and backend architecture
- User authentication system
- Interview scheduling and management
- Demo request system
- Enterprise solutions showcase
- Documentation and setup guides

## [1.0.0] - 2025-03-23

### Added
- Initial project setup
- Frontend application with React and Vite
- Backend API with Flask
- Shared components and utilities

### Changed
- Implemented basic routing and component structure
- Set up development environment configuration

### Fixed
- Initial setup issues and configuration

## [0.1.0] - 2025-03-23

### Added
- Initial project setup
- Basic interview management features
- User authentication system
- Role-based access control
- Supabase integration
- File upload support

### Changed
- Updated project structure to follow modular architecture
- Separated frontend and backend code
- Added proper environment configuration

### Fixed
- Initial setup issues
- Configuration file organization

[Unreleased]: https://github.com/rohanchikorde/chatncheck-in/compare/v0.1.0...HEAD
[1.1.0]: https://github.com/rohanchikorde/chatncheck-in/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/rohanchikorde/chatncheck-in/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/rohanchikorde/chatncheck-in/compare/v0.0.0...v0.1.0
