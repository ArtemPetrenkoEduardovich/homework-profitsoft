package com.company.homeworkprofitsoft;

import com.company.homeworkprofitsoft.data.Address;
import com.company.homeworkprofitsoft.data.GroupData;
import com.company.homeworkprofitsoft.data.StudentData;
import com.company.homeworkprofitsoft.services.GroupService;
import com.company.homeworkprofitsoft.services.StudentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
public class MyRestController {

    private final StudentService studentService;
    private final GroupService groupService;

    @Autowired
    public MyRestController(StudentService studentService, GroupService groupService) {
        this.studentService = studentService;
        this.groupService = groupService;
    }

    @RequestMapping(value = "/getstudentlist", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String getStudentList() throws JsonProcessingException {
        List studentList = studentService.listAll();
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(studentList);
    }

    @RequestMapping(value = "/getgrouplist", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String getGroupList() throws JsonProcessingException {
        List groupList = groupService.listAll();
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(groupList);
    }

    @RequestMapping(value = "/deleteStudent", method = RequestMethod.POST)
    public RedirectView deleteStudent(@RequestParam("id") Long id) {
        StudentData student = studentService.getStudent(id);
        studentService.deleteStudent(student);
        return new RedirectView("/");
    }

    @RequestMapping(value = "/addStudent", method = RequestMethod.POST)
    public RedirectView addStudent(@RequestParam("name") String name,
                             @RequestParam("birthDate") String birthDate,
                             @RequestParam("address_town") String address_town,
                             @RequestParam("address_street") String address_street,
                             @RequestParam("address_house") String address_house,
                             @RequestParam("group") String group) {

        StudentData student = new StudentData(name);
        if (!birthDate.isEmpty()) student.setBirthDate(LocalDate.parse(birthDate, DateTimeFormatter.ISO_LOCAL_DATE));
        student.setAddress(new Address(address_town, address_street, address_house));
        String groupId = group.substring(4, group.indexOf("; Name"));
        GroupData groupData = groupService.getGroupById(Long.parseLong(groupId));
        student.setGroup(groupData);
        studentService.saveStudent(student);

        return new RedirectView("/");
    }

    @RequestMapping(value = "/updateStudent", method = RequestMethod.POST)
    public RedirectView upDateStudent(@RequestParam("id") Long id,
                                   @RequestParam("name") String name,
                                   @RequestParam("birthDate") String birthDate,
                                   @RequestParam("address_town") String address_town,
                                   @RequestParam("address_street") String address_street,
                                   @RequestParam("address_house") String address_house,
                                   @RequestParam("group") String group) {

        StudentData student = new StudentData();
        student.setId(id);
        student.setName(name);
        if (!birthDate.isEmpty())
            student.setBirthDate(LocalDate.parse(birthDate, DateTimeFormatter.ISO_LOCAL_DATE));
        student.setAddress(new Address(address_town, address_street, address_house));
        String groupId = group.substring(4, group.indexOf("; Name"));
        GroupData groupData = groupService.getGroupById(Long.parseLong(groupId));
        student.setGroup(groupData);
        studentService.saveStudent(student);

        return new RedirectView("/");
    }
}
