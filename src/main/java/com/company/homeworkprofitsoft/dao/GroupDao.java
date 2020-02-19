package com.company.homeworkprofitsoft.dao;

import com.company.homeworkprofitsoft.data.GroupData;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@AllArgsConstructor
public class GroupDao {

    @PersistenceContext
    private EntityManager entityManager;

    public GroupData getGroupById(long id) {
        return entityManager.find(GroupData.class, id);
    }

    public List listAll() {
        // запрос с помощью JPQL
        return entityManager.createQuery("SELECT g from Group g").getResultList();
    }

    public GroupData save(GroupData group) {
        if (group.getId() != null) {
            entityManager.persist(group);
            return group;
        } else {
            return entityManager.merge(group);
        }
    }

    public void delete(GroupData group) {
        entityManager.remove(entityManager.merge(group));
    }
}