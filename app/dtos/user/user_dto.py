from app.marsh import ma
from app.models.users.teachers import Teacher
from app.models.users.users import User
from app.models.users.students import Student

from marshmallow import Schema, fields, validate


class AdminSignupInputSchema(Schema):
    username = fields.Str(required=False, error_messages={'required': 'Username is required.'})
    email = fields.Email(required=False, error_messages={'required': 'Email is required.'})
    password = fields.Str(required=False, validate=validate.Length(min=8), error_messages={
        'required': 'Password is required.',
        'length': 'Password must be at least 8 characters long.'
    })


adminSignupInputSchema = AdminSignupInputSchema()


class AuthenticateInputSchema(Schema):
    email = fields.Email(required=False, error_messages={'required': 'Email is required.'})
    password = fields.Str(required=False, validate=validate.Length(min=8), error_messages={
        'required': 'Password is required.',
        'length': 'Password must be at least 8 characters long.'
    })


authenticateInputSchema = AuthenticateInputSchema()


class StudentSignupInputSchema(Schema):
    username = fields.Str(required=False, error_messages={'required': 'Username is required.'})
    email = fields.Email(required=False, error_messages={'required': 'Email is required.'})
    password = fields.Str(required=False, validate=validate.Length(min=8), error_messages={
        'required': 'Password is required.',
        'length': 'Password must be at least 8 characters long.'
    })
    first_name = fields.Str(required=False, error_messages={'required': 'First name is required.'})
    last_name = fields.Str(required=False, error_messages={'required': 'Last name is required.'})
    phone_number = fields.Str(required=False, error_messages={'required': 'Phone number is required.'})
    grade_level = fields.Int(required=False, error_messages={'required': 'Grade Level is required.'})


studentSignupInputSchema = StudentSignupInputSchema()


class TeacherSignupInputSchema(Schema):
    username = fields.Str(required=False, error_messages={'required': 'Username is required.'})
    email = fields.Email(required=False, error_messages={'required': 'Email is required.'})
    password = fields.Str(required=False, validate=validate.Length(min=8), error_messages={
        'required': 'Password is required.',
        'length': 'Password must be at least 8 characters long.'
    })
    first_name = fields.Str(required=False, error_messages={'required': 'First name is required.'})
    last_name = fields.Str(required=False, error_messages={'required': 'Last name is required.'})
    phone_number = fields.Str(required=False, error_messages={'required': 'Phone number is required.'})
    subject_expertise = fields.Str(required=False, error_messages={'required': 'Subject Expertise is required.'})


teacherSignupInputSchema = TeacherSignupInputSchema()


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User

    exclude = ('password',)


admin_schema = UserSchema()
admins_schema = UserSchema(many=True)


class StudentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Student
        include_fk = True

    user = ma.Nested('UserSchema', exclude=('password', 'user_id'))


student_schema = StudentSchema()
students_schema = StudentSchema(many=True)


class TeacherSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Teacher
        include_fk = True

    user = ma.Nested('UserSchema', exclude=('password', 'user_id'))


teacher_schema = TeacherSchema()
teachers_schema = TeacherSchema(many=True)
