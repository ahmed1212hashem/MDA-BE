from flask_restx import fields, reqparse


def signup_admin_model_dto(api) -> dict:
    return api.model('Admin Signup', {
        'username': fields.String(required=True, description='Username'),
        'email': fields.String(required=True, description='Email'),
        'password': fields.String(required=True, description='Password (min 8 characters)', min_length=8),
    }
                     , strict=True)


def authenticate_model_dto(api) -> dict:
    return api.model('Admin Signup', {
        'email': fields.String(required=True, description='Email'),
        'password': fields.String(required=True, description='Password (min 8 characters)', min_length=8),
    }
                     , strict=True)


def signup_student_model_dto(api) -> dict:
    return api.model('Student Signup', {
        'username': fields.String(required=True, description='Username'),
        'email': fields.String(required=True, description='Email'),
        'password': fields.String(required=True, description='Password (min 8 characters)', min_length=8),
        'first_name': fields.String(required=True, description='First Name'),
        'last_name': fields.String(required=True, description='Last Name'),
        'phone_number': fields.String(required=True, description='Phone Number'),
        'grade_level': fields.Integer(required=True, description='Grade Level')
    }, strict=True)


def signup_teacher_model_dto(api) -> dict:
    return api.model('Student Signup', {
        'username': fields.String(required=True, description='Username'),
        'email': fields.String(required=True, description='Email'),
        'password': fields.String(required=True, description='Password (min 8 characters)', min_length=8),
        'first_name': fields.String(required=True, description='First Name'),
        'last_name': fields.String(required=True, description='Last Name'),
        'phone_number': fields.String(required=True, description='Phone Number'),
        'subject_expertise': fields.String(required=True, description='Subject Expertise')
    }, strict=True)


student_parser = reqparse.RequestParser()
student_parser.add_argument('grade_level', type=int, required=False, help='Filter by grade level')
student_parser.add_argument('page', type=int, required=False, default=1, help='Page number')
student_parser.add_argument('per_page', type=int, required=False, default=10, help='Number of items per page')

teacher_parser = reqparse.RequestParser()
teacher_parser.add_argument('subject_expertise', type=int, required=False, help='Filter by subject expertise')
teacher_parser.add_argument('page', type=int, required=False, default=1, help='Page number')
teacher_parser.add_argument('per_page', type=int, required=False, default=10, help='Number of items per page')
