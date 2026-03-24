package lk.ijse.backend.repository;

import lk.ijse.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {

    @Query(value = "SELECT student_id FROM students ORDER BY student_id DESC LIMIT 1", nativeQuery = true)
    String findLastStudentId();

}
