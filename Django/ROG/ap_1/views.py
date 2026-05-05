from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect

# 🏠 Home
def home(request):
    return render(request, 'project.html')


# 📝 Register
def register(request):
    if request.method == 'POST':

        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm = request.POST.get('confirm_password')

        # 🔐 LOGIN 
        if confirm is None:
            user = authenticate(request, username=email, password=password)

            if user:
                login(request, user)
                return redirect('home')
            else:
                return render(request, 'project_registration.html', {
                    'login_errors': ['Invalid email or password'],
                    'active_tab': 'login'
                })

        # 📝 SIGNUP
        if password != confirm:
            return render(request, 'project_registration.html', {
                'register_errors': ['Passwords do not match'],
                'active_tab': 'signup'
            })

        if User.objects.filter(username=email).exists():
            return render(request, 'project_registration.html', {
                'register_errors': ['Email already exists'],
                'active_tab': 'signup'
            })

        user = User.objects.create_user(username=email, email=email, password=password)
        login(request, user)

        return redirect('home')

    return render(request, 'project_registration.html')