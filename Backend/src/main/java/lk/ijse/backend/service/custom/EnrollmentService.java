package lk.ijse.backend.service.custom;

import lk.ijse.backend.dto.EnrollmentDTO;

import java.util.List;

public interface EnrollmentService {
    public void enrollCourse(EnrollmentDTO enrollmentDTO);
    public List<EnrollmentDTO> getAllEnrollments();
}
