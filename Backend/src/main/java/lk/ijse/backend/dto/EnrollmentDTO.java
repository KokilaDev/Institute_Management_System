package lk.ijse.backend.dto;

public class EnrollmentDTO {
    private Integer enrollmentId;
    private String studentId;
    private String studentName;
    private String courseName;
    private double fee;
    private String paymentType;
    private int discount;
    private double total;
    private String enrollDate;

    public EnrollmentDTO() {
    }

    public EnrollmentDTO(Integer enrollmentId, String studentId, String studentName, String courseName, double fee, String paymentType, int discount, double total, String enrollDate) {
        this.enrollmentId = enrollmentId;
        this.studentId = studentId;
        this.studentName = studentName;
        this.courseName = courseName;
        this.fee = fee;
        this.paymentType = paymentType;
        this.total = total;
        this.discount = discount;
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

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getEnrollDate() {
        return enrollDate;
    }

    public void setEnrollDate(String enrollDate) {
        this.enrollDate = enrollDate;
    }
}
