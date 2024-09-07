from functools import wraps
from flask import jsonify, request


def base_response(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        response = func(*args, **kwargs)
        if isinstance(response, tuple):
            data, code = response
        else:
            data, code = response, 200

        return {
            'status': 'success',
            'data': data
        }, code

    return wrapper
