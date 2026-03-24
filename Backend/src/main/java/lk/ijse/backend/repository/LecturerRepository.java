package lk.ijse.backend.repository;

import lk.ijse.backend.entity.Lecturer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LecturerRepository extends JpaRepository<Lecturer, String> {

    @Query(value = "SELECT lecturer_id FROM lecturers ORDER BY lecturer_id DESC LIMIT 1", nativeQuery = true)
    String findLastLecturerId();

}
