package lk.ijse.backend.service.custom.impl;

import lk.ijse.backend.dto.PaymentDTO;
import lk.ijse.backend.entity.Payment;
import lk.ijse.backend.exception.CustomException;
import lk.ijse.backend.repository.PaymentRepository;
import lk.ijse.backend.service.custom.PaymentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void savePayment(PaymentDTO paymentDTO) {
        if (paymentDTO == null) {
            throw new CustomException("Invalid payment data");
        }
        System.out.println("Saving payment " + paymentDTO);
        Payment payment = modelMapper.map(paymentDTO, Payment.class);
        payment.setPaymentDate(LocalDate.now());
        paymentRepository.save(payment);
    }

    @Override
    public List<PaymentDTO> getPayments() {
        List<Payment> paymentList = paymentRepository.findAll();
        return paymentList.stream().map(
                payment -> modelMapper.map(payment, PaymentDTO.class)
        ).toList();
    }
}
