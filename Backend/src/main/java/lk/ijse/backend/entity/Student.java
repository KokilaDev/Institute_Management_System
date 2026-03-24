package lk.ijse.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "students")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Student {

    @Id
    @Column(name = "student_id", length = 50)
    private String studentId;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 100)
    private String address;

    @Column(length = 20)
    private String contact;

    @Column(length = 50)
    private String email;

    @Column(name = "register_date")
    private LocalDate registerDate;

    @PrePersist
    protected void onCreate() {
        this.registerDate = LocalDate.now();
    }

}