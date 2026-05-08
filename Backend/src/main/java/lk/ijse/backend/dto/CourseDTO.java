package lk.ijse.backend.dto;

public class CourseDTO {
    private Integer courseId;
    private String courseName;
    private String courseDescription;
    private String duration;
    private double fee;
    private String lecturer;
    private String startDate;
    private String endDate;

    public CourseDTO() {
    }

    public CourseDTO(String lecturer, double fee, String startDate, String duration, String courseName, String courseDescription, Integer courseId) {
        this.lecturer = lecturer;
        this.fee = fee;
        this.startDate = startDate;
        this.duration = duration;
        this.courseName = courseName;
        this.courseDescription = courseDescription;
        this.courseId = courseId;
    }

    public CourseDTO(Integer courseId, String courseName, String courseDescription, String duration, double fee, String lecturer, String startDate, String endDate) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.courseDescription = courseDescription;
        this.duration = duration;
        this.fee = fee;
        this.lecturer = lecturer;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public double getFee() {
        return fee;
    }

    public void setFee(double fee) {
        this.fee = fee;
    }

    public String getLecturer() {
        return lecturer;
    }

    public void setLecturer(String lecturer) {
        this.lecturer = lecturer;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
}
