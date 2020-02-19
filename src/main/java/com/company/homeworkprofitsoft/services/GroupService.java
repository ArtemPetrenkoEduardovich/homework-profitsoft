package com.company.homeworkprofitsoft.services;

import com.company.homeworkprofitsoft.data.GroupData;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface GroupService {
    List listAll();

    void saveGroup(GroupData group);

    GroupData getGroupById(long id);

    void deleteGroup(GroupData group);
}
