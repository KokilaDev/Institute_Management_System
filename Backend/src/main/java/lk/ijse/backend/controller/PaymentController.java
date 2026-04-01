package lk.ijse.backend.controller;

import lk.ijse.backend.dto.APIResponse;
import lk.ijse.backend.dto.PaymentDTO;
import lk.ijse.backend.service.custom.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/payment")
@CrossOrigin
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/pay")
    public ResponseEntity<APIResponse> payment(@RequestBody PaymentDTO paymentDTO) {
        paymentService.savePayment(paymentDTO);
        return new ResponseEntity<>(new APIResponse(
                200, "Paid", null
        ), HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<APIResponse> getAllPayments() {
        List<PaymentDTO> paymentDTOS = paymentService.getPayments();
        return new ResponseEntity<>(new APIResponse(
                200, "Payment Retrieved", paymentDTOS
        ), HttpStatus.OK);
    }
}
