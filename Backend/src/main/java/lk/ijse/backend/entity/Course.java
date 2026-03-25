package lk.ijse.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "courses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Integer id;

    @Column(nullable = false, length = 100)
    private String courseName;

    @Column(length = 50)
    private String duration;

    @Column(length = 50)
    private double fee;

    @Column(length = 100)
    private String lecturer;

    @Column(name = "start_date")
    private String startDate;

    @Column(name = "end_date")
    private String endDate;
}
