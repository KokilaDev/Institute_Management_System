package lk.ijse.backend.controller;

import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.dto.CourseDTO;
import lk.ijse.backend.service.custom.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/course")
@CrossOrigin
public class CourseController {

    private final CourseService courseService;

    @PostMapping("save")
    public ResponseEntity<APIResponse> saveCourse(@RequestBody CourseDTO courseDTO) {
        courseService.saveCourse(courseDTO);
        return new ResponseEntity<>(new APIResponse(
                200, "Course Saved", null
        ), HttpStatus.CREATED);
    }

}
