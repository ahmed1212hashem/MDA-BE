from functools import wraps
from flask_jwt_extended import JWTManager, decode_token, get_jwt_identity
import logging

logging.basicConfig(level=logging.DEBUG)
jwt = JWTManager()
def role_required(role):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            current_user = get_jwt_identity()
            if current_user['role'] not in role:
                raise Exception("Access Denied")
            return fn(*args, **kwargs)
        return decorator
    return wrapper
#
#
# def user_required(f):
#     @wraps(f)
#     def decorated(*args, **kwargs):
#         token = None
#
#
#         if "Authorization" in request.headers:
#             token = request.headers["Authorization"].split(" ")[1]
#         if not token:
#             return {
#                 "message": "Authentication Token is missing",
#                 "error": "Unauthorized"
#             }, 401
#         try:
#             data = decode_token(token)
#             user_id = data['sub']['account_id']
#             current_user = Account.query.get(user_id)
#             if current_user.isStaff == True:
#                 return {
#                 "message": "Invalid Authentication token",
#                 "error": "Unauthorized"
#             }, 401
#         except Exception as e:
#             return {
#                 "message": "An error Occured",
#                 "error": str(e)
#             }, 500
#
#         return f(*args, **kwargs)
#
#     return decorated