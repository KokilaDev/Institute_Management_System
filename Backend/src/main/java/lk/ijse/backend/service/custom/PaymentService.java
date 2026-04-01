package lk.ijse.backend.service.custom;

import lk.ijse.backend.dto.PaymentDTO;

import java.util.List;

public interface PaymentService {
    public void savePayment(PaymentDTO paymentDTO);
    public List<PaymentDTO> getPayments();
}
