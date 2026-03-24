package lk.ijse.backend.service.custom.impl;

import lk.ijse.backend.repository.StudentRepository;
import lk.ijse.backend.service.custom.StudentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String generateStudentId() {
        String lastId = studentRepository.findLastStudentId();
        String currentYear = String.valueOf(LocalDate.now().getYear()).substring(2);

        if (lastId == null) {
            return "NGIT-STU-" + currentYear + "-001";
        }
        String[] parts = lastId.split("-");
        String lastYear = parts[2];
        int lastNumber = Integer.parseInt(parts[3]);

        if (!lastYear.equals(currentYear)) {
            return "NGIT-STU-" + currentYear + "-001";
        }
        int nextNumber = lastNumber + 1;
        return "NGIT-STU-" + currentYear + "-" + String.format("%03d", nextNumber);
    }
}
