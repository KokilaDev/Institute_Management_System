package lk.ijse.backend.service.custom;

import lk.ijse.backend.dto.CourseDTO;

import java.util.List;

public interface CourseService {
    public void saveCourse(CourseDTO courseDTO);
    public void updateCourse(CourseDTO courseDTO);
    public void deleteCourse(Integer id);
    public List<CourseDTO> getAllCourses();
    public CourseDTO getCourseById(Integer id);
}
