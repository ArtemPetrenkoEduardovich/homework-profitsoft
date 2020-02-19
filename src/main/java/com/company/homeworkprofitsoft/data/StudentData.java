package com.company.homeworkprofitsoft.data;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.time.LocalDate;

@Entity(name = "Student")
@Getter
@Setter
@NoArgsConstructor
@ToString
@Table(name = "students")
public class StudentData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private LocalDate birthDate;

    public StudentData(String name) {
        this.name = name;
    }

    @Embedded
    @AttributeOverrides({
            @AttributeOverride( name = "town", column = @Column(name = "address_town")),
            @AttributeOverride( name = "street", column = @Column(name = "address_street")),
            @AttributeOverride( name = "house", column = @Column(name = "address_house"))
    })
    private Address address;

    @ManyToOne
    @JoinColumn(name="id_group")
//    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JsonManagedReference
    private GroupData group;
}
