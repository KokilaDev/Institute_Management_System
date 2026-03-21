package lk.ijse.backend.exception;

import io.jsonwebtoken.ExpiredJwtException;
import lk.ijse.backend.dto.APIResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UsernameNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public APIResponse handleUsernameNotFoundException(UsernameNotFoundException ex) {
        ex.printStackTrace();
        return new APIResponse(
                HttpStatus.NOT_FOUND.value(),
                "Username not found",
                ex.getMessage());
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public APIResponse handleBadCredentialsException(BadCredentialsException ex) {
        ex.printStackTrace();
        return new APIResponse(
                HttpStatus.UNAUTHORIZED.value(),
                "username or password is incorrect",
                ex.getMessage());
    }

    @ExceptionHandler(ExpiredJwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public APIResponse handleExpiredJwtException(ExpiredJwtException ex) {
        ex.printStackTrace();
        return new APIResponse(
                HttpStatus.UNAUTHORIZED.value(),
                "expired token",
                ex.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public APIResponse handleRuntimeException(RuntimeException ex) {
        ex.printStackTrace();
        return new APIResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "error occurred",
                ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<lk.ijse.backend.dto.APIResponse> handleGenericException(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(new lk.ijse.backend.dto.APIResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Internal Server Error",
                e.getMessage()
        ), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<lk.ijse.backend.dto.APIResponse> handleNullPointerException(NullPointerException e) {
        e.printStackTrace();
        return new ResponseEntity<>(new lk.ijse.backend.dto.APIResponse(
                HttpStatus.BAD_REQUEST.value(),
                "Null Values are not allowed",
                e.getMessage()
        ), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<lk.ijse.backend.dto.APIResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        e.printStackTrace();
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach((error) -> {
            errors.put(error.getObjectName(), error.getDefaultMessage());
        });
        return new ResponseEntity<>(new lk.ijse.backend.dto.APIResponse(
                HttpStatus.BAD_REQUEST.value(),
                "Validation Failed",
                errors
        ), HttpStatus.BAD_REQUEST);
    }
}
