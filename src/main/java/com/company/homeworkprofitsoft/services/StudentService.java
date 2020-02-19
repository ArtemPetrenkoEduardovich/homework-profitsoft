package com.company.homeworkprofitsoft.services;

import com.company.homeworkprofitsoft.data.StudentData;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StudentService {
    List listAll();

    void saveStudent(StudentData stud);

    StudentData getStudent(long id);

    void deleteStudent(StudentData student);
}
