package com.company.homeworkprofitsoft.data;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "Group")
@Getter
@Setter
@NoArgsConstructor
//@ToString
@Table(name="gruppa")
public class GroupData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(fetch = FetchType.EAGER, mappedBy="group")
//    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JsonBackReference
    private Set<StudentData> students;

    public GroupData(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Id: " + id + ";   Name: " + name + ";";
    }
}

