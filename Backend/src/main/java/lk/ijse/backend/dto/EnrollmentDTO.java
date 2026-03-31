package lk.ijse.backend.dto;

public class EnrollmentDTO {
    private Integer enrollmentId;
    private String studentId;
    private String studentName;
    private String courseName;
    private double fee;
    private String enrollDate;

    public EnrollmentDTO() {
    }

    public EnrollmentDTO(Integer enrollmentId, String studentId, String studentName, String courseName, double fee, String enrollDate) {
        this.enrollmentId = enrollmentId;
        this.studentId = studentId;
        this.studentName = studentName;
        this.courseName = courseName;
        this.fee = fee;
        this.enrollDate = enrollDate;
    }

    public Integer getEnrollmentId() {
        return enrollmentId;
    }

    public void setEnrollmentId(Integer enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public double getFee() {
        return fee;
    }

    public void setFee(double fee) {
        this.fee = fee;
    }

    public String getEnrollDate() {
        return enrollDate;
    }

    public void setEnrollDate(String enrollDate) {
        this.enrollDate = enrollDate;
    }
}
