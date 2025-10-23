import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class AuthComponent {
  isLogin = true; 
  isSubmitted = false;
  
  email = '';
  password = '';
  
  firstName = '';
  lastName = '';
  confirmPassword = '';
  
  showFirstNameWarning = false;
  showLastNameWarning = false;

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.clearForm();
  }

  clearForm() {
    this.email = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';
    this.confirmPassword = '';
    this.isSubmitted = false;
    this.showFirstNameWarning = false;
    this.showLastNameWarning = false;
  }

  onNameInput(event: any, field: 'firstName' | 'lastName') {
    const value = event.target.value;
    const originalValue = value;
    
    const cleanValue = value.replace(/[^а-яА-Яa-zA-Z\s]/g, '');
    
    const hasInvalidChars = originalValue !== cleanValue;
    
    if (field === 'firstName') {
      this.firstName = cleanValue;
      this.showFirstNameWarning = hasInvalidChars;
    } else {
      this.lastName = cleanValue;
      this.showLastNameWarning = hasInvalidChars;
    }
    
    event.target.value = cleanValue;
    
    if (hasInvalidChars) {
      setTimeout(() => {
        if (field === 'firstName') {
          this.showFirstNameWarning = false;
        } else {
          this.showLastNameWarning = false;
        }
      }, 2000);
    }
  }

  getFieldError(fieldName: string): string {
    if (!this.isSubmitted) return '';
    
    switch (fieldName) {
      case 'firstName':
        if (!this.firstName.trim()) return 'Имя обязательно';
        if (this.firstName.length < 2) return 'Имя должно содержать минимум 2 символа';
        if (!/^[а-яА-Яa-zA-Z\s]+$/.test(this.firstName)) return 'Имя может содержать только буквы';
        break;
      case 'lastName':
        if (!this.lastName.trim()) return 'Фамилия обязательна';
        if (this.lastName.length < 2) return 'Фамилия должна содержать минимум 2 символа';
        if (!/^[а-яА-Яa-zA-Z\s]+$/.test(this.lastName)) return 'Фамилия может содержать только буквы';
        break;
      case 'email':
        if (!this.email.trim()) return 'Email обязателен';
        if (!this.isValidEmail(this.email)) return 'Введите корректный email';
        break;
      case 'password':
        if (!this.password.trim()) return 'Пароль обязателен';
        if (this.password.length < 6) return 'Пароль должен содержать минимум 6 символов';
        break;
      case 'confirmPassword':
        if (!this.isLogin && !this.confirmPassword.trim()) return 'Подтверждение пароля обязательно';
        if (!this.isLogin && this.password !== this.confirmPassword) return 'Пароли не совпадают';
        break;
    }
    return '';
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isFormValid(): boolean {
    if (this.isLogin) {
      return !!(this.email.trim() && this.password.trim() && this.isValidEmail(this.email));
    } else {
      return !!(
        this.firstName.trim() && 
        this.lastName.trim() && 
        this.email.trim() && 
        this.password.trim() && 
        this.confirmPassword.trim() &&
        this.password === this.confirmPassword &&
        this.isValidEmail(this.email) &&
        this.firstName.length >= 2 &&
        this.lastName.length >= 2 &&
        this.password.length >= 6 &&
        /^[а-яА-Яa-zA-Z\s]+$/.test(this.firstName) &&
        /^[а-яА-Яa-zA-Z\s]+$/.test(this.lastName)
      );
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    
    if (!this.isFormValid()) {
      console.log('Форма невалидна, отправка заблокирована');
      return; 
    }

    if (this.isLogin) {
      console.log('Вход:', { email: this.email, password: this.password });
      alert('Вход выполнен!');
    } else {
      console.log('Регистрация:', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      });
      alert('Регистрация завершена!');
    }
  }
}
