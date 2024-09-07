from flask import request
from flask_jwt_extended import jwt_required
from flask_restx import Namespace, Resource

from app.authentication import role_required
from app.base_response import base_response
from app.enums.user.user_roles import UserRole
from app.services.user.user_services import UserService
from app.dtos.user.user_dto import (adminSignupInputSchema, admin_schema, studentSignupInputSchema, student_schema,
                                    students_schema, teacherSignupInputSchema, teacher_schema, teachers_schema,
                                    authenticateInputSchema)
from app.schemas.user.user_schema import (signup_admin_model_dto, signup_student_model_dto, student_parser, teacher_parser,
                                          signup_teacher_model_dto, authenticate_model_dto)

user_namespace = Namespace('user', description='User operations')
signup_admin_request_model = signup_admin_model_dto(user_namespace)

authenticate_request_model = authenticate_model_dto(user_namespace)

signup_student_request_model = signup_student_model_dto(user_namespace)

signup_teacher_request_model = signup_teacher_model_dto(user_namespace)


@user_namespace.route('/admin/signup')
class SignupAdminResource(Resource):
    @base_response
    @user_namespace.expect(signup_admin_request_model, validate=True)
    def post(self):
        data = adminSignupInputSchema.load(request.json)
        new_user = UserService.create_admin_user(data)
        signup_output = admin_schema.dump(new_user.serialize())
        return signup_output, 201


@user_namespace.route('/admin/authenticate')

class SignupAdminResource(Resource):
    @base_response
    @user_namespace.expect(authenticate_request_model, validate=True)
    def post(self):
        data = authenticateInputSchema.load(request.json)
        token = UserService.authenticate(data)
        return token, 200


@user_namespace.route('/student/signup')
class SignupAdminResource(Resource):
    @jwt_required()
    @base_response
    @role_required(['ADMIN'])
    @user_namespace.expect(signup_student_request_model, validate=True)
    def post(self):
        data = studentSignupInputSchema.load(request.json)
        new_user = UserService.create_student_user(data)
        signup_output = student_schema.dump(new_user.serialize())
        return signup_output, 201


@user_namespace.route('/student/')
class Class(Resource):
    # @jwt_required()
    @base_response
    # @role_required(['ADMIN'])
    @user_namespace.expect(student_parser)
    def get(self):
        args = student_parser.parse_args()
        data = {'grade_level': args.get('grade_level'),
                'page': args.get('page'),
                'per_page': args.get('per_page')}

        students = UserService.get_all_students(data)

        dump_students = students_schema.dump([student.serialize() for student in students])
        return dump_students, 200

    @user_namespace.route('/student/<int:user_id>')
    class Class(Resource):
        # @jwt_required()
        @base_response
        # @role_required(['ADMIN'])
        def get(self, user_id):
            student = UserService.get_student_by_id(user_id)

            dump_student = student_schema.dump(student.serialize())
            return dump_student, 200

        # @jwt_required()
        @base_response
        # @role_required(['ADMIN'])
        def delete(self, user_id):
            UserService.delete_user(user_id,UserRole.STUDENT.value)
            return {}, 200

@user_namespace.route('/teacher/signup')
class Class(Resource):
    @jwt_required()
    @base_response
    @role_required(['ADMIN'])
    @user_namespace.expect(signup_teacher_request_model, validate=True)
    def post(self):
        data = teacherSignupInputSchema.load(request.json)
        new_user = UserService.create_teacher_user(data)
        signup_output = teacher_schema.dump(new_user.serialize())
        return signup_output, 201


@user_namespace.route('/teacher/')
class Class(Resource):
    # @jwt_required()
    @base_response
    # @role_required(['ADMIN'])
    @user_namespace.expect(teacher_parser)
    def get(self):
        args = student_parser.parse_args()
        data = {'subject_expertise': args.get('subject_expertise'),
                'page': args.get('page'),
                'per_page': args.get('per_page')}

        teachers = UserService.get_all_teachers(data)

        dump_teachers = teachers_schema.dump([teacher.serialize() for teacher in teachers])
        return dump_teachers, 200

    @user_namespace.route('/teacher/<int:user_id>')
    class Class(Resource):
        # @jwt_required()
        @base_response
        # @role_required(['ADMIN'])
        def get(self, user_id):
            teacher = UserService.get_teacher_by_id(user_id)

            dump_teacher = teacher_schema.dump(teacher.serialize())
            return dump_teacher, 200

        # @jwt_required()
        @base_response
        # @role_required(['ADMIN'])
        def delete(self, user_id):
            UserService.delete_user(user_id,UserRole.TEACHER.value)
            return {}, 200


