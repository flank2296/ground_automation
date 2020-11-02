

def prepare_session(user):
    ''' Used for preparing session '''
    keys = ["email", "is_staff", "username", "first_name", "last_name"]
    session = {}
    for key in keys:
        session[key] = user.__getattribute__(key)
    return session