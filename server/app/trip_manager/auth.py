from functools import wraps
import os

from clerk_backend_api import AuthenticateRequestOptions, Clerk
from flask import jsonify, request
import requests

clerk = Clerk(bearer_auth=os.environ.get("CLERK_SECRET_KEY"))


def require_auth(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")

        if not auth_header.startswith("Bearer "):
            return jsonify({"error": "Unauthorized - No token provided"}), 401

        token = auth_header.split("Bearer ")[1]

        try:
            request_state = clerk.authenticate_request(
                request,
                AuthenticateRequestOptions(),
            )
            if not request_state.is_signed_in:
                return jsonify({"error": "Unauthorized - Invalid token"}), 401
            user_id = request_state.payload.get("sub")
            return f(user_id=user_id, *args, **kwargs)
        except Exception as e:
            return jsonify({"error": f"Unauthorized - {e}"}), 401

    return decorated_function
