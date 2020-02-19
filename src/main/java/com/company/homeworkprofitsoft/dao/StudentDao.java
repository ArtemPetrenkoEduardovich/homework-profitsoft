package com.company.homeworkprofitsoft.dao;

import com.company.homeworkprofitsoft.data.StudentData;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
@AllArgsConstructor
public class StudentDao {

    @PersistenceContext
    private EntityManager entityManager;

    public StudentData getStudent(long id) {
        return entityManager.find(StudentData.class, id);
    }

//    public void update(StudentData stud) {
//        Query query = entityManager.createQuery("UPDATE Student s SET s.salary = s.salary + :increment WHERE s.dept = :dept");
//    }

    public List listAll() {
        // запрос с помощью JPQL
        return entityManager.createQuery("SELECT s from Student s").getResultList();
    }

    public StudentData save(StudentData stud) {
        if (stud.getId() == null) {
            entityManager.persist(stud);
            return stud;
        } else {
            return entityManager.merge(stud);
        }
    }

    public void delete(StudentData student) {
        entityManager.remove(entityManager.merge(student));
    }
}
