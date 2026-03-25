package lk.ijse.backend.service.custom.impl;

import lk.ijse.backend.dto.CourseDTO;
import lk.ijse.backend.entity.Course;
import lk.ijse.backend.entity.Lecturer;
import lk.ijse.backend.repository.CourseRepository;
import lk.ijse.backend.repository.LecturerRepository;
import lk.ijse.backend.service.custom.CourseService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private LecturerRepository lecturerRepository;

    @Override
    public void saveCourse(CourseDTO courseDTO) {
//        Lecturer lecturer = lecturerRepository.findById(courseDTO.getLecturer()).orElse(null);
//        courseDTO.setLecturer(String.valueOf(lecturer));
//        System.out.println("course saved" + courseDTO);
//        courseRepository.save(modelMapper.map(courseDTO, Course.class));

        // Convert DTO to entity for basic fields
        Course course = modelMapper.map(courseDTO, Course.class);

        // Fetch Lecturer entity by ID and set it
//        Lecturer lecturer = lecturerRepository.findById(courseDTO.getLecturer())
//                .orElseThrow(() -> new RuntimeException("Lecturer not found"));
//        course.setLecturer(String.valueOf(lecturer));
        course.setLecturer(courseDTO.getLecturer());

        // Save course
        courseRepository.save(course);

        System.out.println("Course saved: " + course);
    }
}