package lk.ijse.backend.dto;

import java.time.LocalDate;

public class PaymentDTO {
    private Integer paymentId;
    private LocalDate paymentDate;
    private String studentId;
    private String studentName;
    private String courseName;
    private String courseFee;
    private String paymentType;
    private double discount;
    private double totalAmount;

    public PaymentDTO() {
    }

    public PaymentDTO(String courseFee, String paymentType, double discount, double totalAmount, String courseName, String studentName, String studentId, LocalDate paymentDate, Integer paymentId) {
        this.courseFee = courseFee;
        this.paymentType = paymentType;
        this.discount = discount;
        this.totalAmount = totalAmount;
        this.courseName = courseName;
        this.studentName = studentName;
        this.studentId = studentId;
        this.paymentDate = paymentDate;
        this.paymentId = paymentId;
    }

    public Integer getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Integer paymentId) {
        this.paymentId = paymentId;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
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

    public String getCourseFee() {
        return courseFee;
    }

    public void setCourseFee(String courseFee) {
        this.courseFee = courseFee;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
