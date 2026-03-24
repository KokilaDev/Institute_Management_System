package lk.ijse.backend.controller;

import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.service.custom.LecturerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
