package com.company.homeworkprofitsoft.services;

import com.company.homeworkprofitsoft.dao.GroupDao;
import com.company.homeworkprofitsoft.data.GroupData;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@AllArgsConstructor
public class GroupServiceImpl implements GroupService {

    @Autowired
    private GroupDao groupDao;

    @Override
    public List listAll() {
        return groupDao.listAll();
    }

    @Override
    @Transactional
    public void saveGroup(GroupData group) {
        groupDao.save(group);
    }

    @Override
    @Transactional
    public GroupData getGroupById(long id) {
        return groupDao.getGroupById(id);
    }

    @Override
    @Transactional
    public void deleteGroup(GroupData group) {
        groupDao.delete(group);
    }
}
