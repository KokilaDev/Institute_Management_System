package lk.ijse.backend.service.custom.impl;

import lk.ijse.backend.dto.CourseDTO;
import lk.ijse.backend.entity.Course;
import lk.ijse.backend.exception.CustomException;
import lk.ijse.backend.repository.CourseRepository;
import lk.ijse.backend.service.custom.CourseService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void saveCourse(CourseDTO courseDTO) {
        Course course = modelMapper.map(courseDTO, Course.class);
        course.setLecturer(courseDTO.getLecturer());
        courseRepository.save(course);
        System.out.println("Course saved: " + course);
    }

    @Override
    public void updateCourse(CourseDTO courseDTO) {
        Course existingCourse = courseRepository
                .findById(courseDTO.getCourseId())
                .orElseThrow(() -> new CustomException("Course not found"));
        modelMapper.map(courseDTO, existingCourse);
        courseRepository.save(existingCourse);
    }

    @Override
    public void deleteCourse(Integer id) {
        courseRepository.deleteById(id);
    }

    @Override
    public List<CourseDTO> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        return modelMapper.map(courses, new TypeToken<List<CourseDTO>>() {}.getType());
    }
}