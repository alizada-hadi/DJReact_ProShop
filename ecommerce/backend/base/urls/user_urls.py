from django.urls import path
from base.views import user_views


urlpatterns = [
    path('login/', user_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("register/", user_views.register_new_user, name="register"), 
    path("profile/", user_views.user_profile, name="user-profile"),
    path("update/",  user_views.update_user, name="update-user"),
    path("", user_views.get_users, name="users"),
]