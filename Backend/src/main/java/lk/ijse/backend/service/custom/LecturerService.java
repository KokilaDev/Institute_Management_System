package lk.ijse.backend.service.custom;

import lk.ijse.backend.dto.LecturerDTO;

import java.util.List;

public interface LecturerService {
    public String generateLecturerId();
    public void saveLecturer(LecturerDTO lecturerDTO);
//    public void updateLecturer(LecturerDTO lecturerDTO);
//    public void deleteLecturer(String lecturerId);
//    public List<LecturerDTO> getAllLecturers();
}
