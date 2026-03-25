package lk.ijse.backend.service.custom;

import lk.ijse.backend.dto.CourseDTO;

import java.util.List;

public interface CourseService {
    public void saveCourse(CourseDTO courseDTO);
//    public void updateStudent(CourseDTO courseDTO);
//    public void deleteStudent(String id);
    public List<CourseDTO> getAllCourses();
}
