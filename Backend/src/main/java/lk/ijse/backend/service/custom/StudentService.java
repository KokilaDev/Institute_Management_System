package lk.ijse.backend.service.custom;

import lk.ijse.backend.dto.StudentDTO;

import java.util.List;

public interface StudentService {
    public String generateStudentId();
    public void saveStudent(StudentDTO studentDTO);
    public void updateStudent(StudentDTO studentDTO);
    public void deleteStudent(String studentId);
    public List<StudentDTO> getAllStudents();
}
