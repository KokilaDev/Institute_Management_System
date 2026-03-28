package lk.ijse.backend.service.custom.impl;

import lk.ijse.backend.dto.CourseDTO;
import lk.ijse.backend.dto.EnrollmentDTO;
import lk.ijse.backend.entity.Enrollment;
import lk.ijse.backend.exception.CustomException;
import lk.ijse.backend.repository.EnrollmentRepository;
import lk.ijse.backend.service.custom.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EnrollmentServiceImpl implements EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void enrollCourse(EnrollmentDTO enrollmentDTO) {
        if (enrollmentDTO == null) {
            throw new CustomException("EnrollmentDTO is null");
        }
        System.out.println("enrollment" + enrollmentDTO);
        Enrollment enrollment = modelMapper.map(enrollmentDTO, Enrollment.class);
        enrollment.setEnrollDate(LocalDate.now());
        enrollmentRepository.save(enrollment);
    }

    @Override
    public List<EnrollmentDTO> getAllEnrollments() {
        List<Enrollment> enrollmentList = enrollmentRepository.findAll();
        return enrollmentList.stream().map(
                enrollment -> modelMapper.map(enrollment, EnrollmentDTO.class)
        ).toList();
    }
}
