package lk.ijse.backend.controller;

import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.dto.StudentDTO;
import lk.ijse.backend.service.custom.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/student")
@CrossOrigin
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/generateId")
    public ResponseEntity<APIResponse> generateStudentId() {
        String newId = studentService.generateStudentId();
        return new ResponseEntity<>(new APIResponse(
                200, "Success", newId
        ), HttpStatus.CREATED);
    }

    @PostMapping("/save")
    public ResponseEntity<APIResponse> saveStudent(@RequestBody StudentDTO studentDTO) {
        studentService.saveStudent(studentDTO);
        return new ResponseEntity<>(new APIResponse(
                200, "Student Saved", null
        ), HttpStatus.CREATED);
    }

}
