import {HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  let token: string | null = null;

  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem('jwt_token');
  }
  
  const isPublic = req.url.includes('/auth/register') || req.url.includes('/auth/login');
  
  if (token && !isPublic) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }
  return next(req);
};

