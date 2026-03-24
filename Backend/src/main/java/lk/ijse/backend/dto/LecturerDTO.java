package lk.ijse.backend.dto;

import java.time.LocalDate;

public class LecturerDTO {
    private String lecturerId;
    private String name;
    private String specialization;
    private String contact;
    private String email;
    private LocalDate registerDate;

    public LecturerDTO() {
    }

    public LecturerDTO(String lecturerId, String specialization, String name, String contact, String email, LocalDate registerDate) {
        this.lecturerId = lecturerId;
        this.specialization = specialization;
        this.name = name;
        this.contact = contact;
        this.email = email;
        this.registerDate = registerDate;
    }

    public String getLecturerId() {
        return lecturerId;
    }

    public void setLecturerId(String lecturerId) {
        this.lecturerId = lecturerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public LocalDate getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(LocalDate registerDate) {
        this.registerDate = registerDate;
    }
}
