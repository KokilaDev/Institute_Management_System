package lk.ijse.backend.controller;

import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.dto.LecturerDTO;
import lk.ijse.backend.service.custom.LecturerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/lecturer")
@CrossOrigin
@RequiredArgsConstructor
public class LecturerController {

    private final LecturerService lecturerService;

    @GetMapping("/generateId")
    public ResponseEntity<APIResponse> generateLecturerId() {
        String newId = lecturerService.generateLecturerId();
        return new ResponseEntity<>(new APIResponse(
                200, "Success", newId
        ), HttpStatus.CREATED);
    }

    @PostMapping("/save")
    public ResponseEntity<APIResponse> saveLecturer(@RequestBody LecturerDTO lecturerDTO) {
        lecturerService.saveLecturer(lecturerDTO);
        return new ResponseEntity<>(new APIResponse(
                200, "Lecturer Saved", null
        ), HttpStatus.CREATED);
    }

}
