package lk.ijse.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "payment")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Integer paymentId;

    @Column(name = "payment_date")
    private LocalDate paymentDate;

    @Column(name = "student_id")
    private String studentId;

    @Column(name = "student_name")
    private String studentName;

    @Column(name = "course_name")
    private String courseName;

    @Column(name = "course_fee")
    private String courseFee;

    @Column(name = "payment_type")
    private String paymentType;

    private double discount;

    @Column(name = "total")
    private double totalAmount;
}
