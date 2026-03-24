package lk.ijse.backend.service.custom.impl;

import lk.ijse.backend.repository.LecturerRepository;
import lk.ijse.backend.service.custom.LecturerService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class LecturerServiceImpl implements LecturerService {

    @Autowired
    private LecturerRepository lecturerRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String generateLecturerId() {
        String lastId = lecturerRepository.findLastLecturerId();
        String currentYear = String.valueOf(LocalDate.now().getYear()).substring(2);

        if (lastId == null) {
            return "NGIT-LEC-" + currentYear + "-001";
        }
        String[] parts = lastId.split("-");
        String lastYear = parts[2];
        int lastNumber = Integer.parseInt(parts[3]);

        if (!lastYear.equals(currentYear)) {
            return "NGIT-LEC-" + currentYear + "-001";
        }
        int nextNumber = lastNumber + 1;
        return "NGIT-LEC-" + currentYear + "-" + String.format("%03d", nextNumber);
    }
}
