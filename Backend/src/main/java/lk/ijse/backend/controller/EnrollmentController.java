package lk.ijse.backend.controller;

import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.dto.EnrollmentDTO;
import lk.ijse.backend.service.custom.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/enrollment")
@CrossOrigin
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @PostMapping("/enroll")
    public ResponseEntity<APIResponse> saveEnrollment(@RequestBody EnrollmentDTO enrollmentDTO) {
        enrollmentService.enrollCourse(enrollmentDTO);
        return new ResponseEntity<>(new APIResponse(
                200, "Enrolled", null
        ), HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<APIResponse> getAllEnrollments() {
        List<EnrollmentDTO> enrollmentDTOS = enrollmentService.getAllEnrollments();
        return new ResponseEntity<>(new APIResponse(
                200, "Enrollment Retrieved", enrollmentDTOS
        ), HttpStatus.OK);
    }
}
