package lk.ijse.backend.dto;

import java.time.LocalDate;

public class StudentDTO {
    private String studentId;
    private String name;
    private String address;
    private String contact;
    private String email;
    private LocalDate registerDate;

    public StudentDTO() {
    }

    public StudentDTO(String studentId, LocalDate registerDate, String email, String contact, String address, String name) {
        this.studentId = studentId;
        this.registerDate = registerDate;
        this.email = email;
        this.contact = contact;
        this.address = address;
        this.name = name;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(LocalDate registerDate) {
        this.registerDate = registerDate;
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
}
