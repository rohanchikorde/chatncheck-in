import os
import ssl
import certifi

# Disable SSL verification for development
ssl._create_default_https_context = ssl._create_unverified_context

# Add self-signed certificate to trusted certificates
if os.path.exists('self_signed_cert.pem'):
    os.environ['SSL_CERT_FILE'] = os.path.abspath('self_signed_cert.pem')
    os.environ['REQUESTS_CA_BUNDLE'] = os.path.abspath('self_signed_cert.pem')
