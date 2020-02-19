package com.company.homeworkprofitsoft.services;

import com.company.homeworkprofitsoft.dao.StudentDao;
import com.company.homeworkprofitsoft.data.StudentData;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentDao studentDao;

    @Override
    public List listAll() {
        return studentDao.listAll();
    }

    @Override
    @Transactional
    public void saveStudent(StudentData stud) {
        studentDao.save(stud);
    }

    @Override
    @Transactional
    public StudentData getStudent(long id) {
        return studentDao.getStudent(id);
    }

    @Override
    @Transactional
    public void deleteStudent(StudentData student) {
        studentDao.delete(student);
    }
}

