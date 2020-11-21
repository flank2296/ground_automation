from functools import wraps
from django.http import HttpResponseForbidden

def session_required():
    ''' Use this decorator for checking a session '''
    def decorator(func):
        def inner_decorator(request, *args, **kwargs):
            if not isinstance(request.session._session, dict):
                return HttpResponseForbidden("Invalid session")
            if request.session._session.keys().__len__() < 1:
                return HttpResponseForbidden("Invalid session")
            return func(request, *args, **kwargs)
        return wraps(func)(inner_decorator)
    return decorator