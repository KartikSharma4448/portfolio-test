import { GraduationCap, Briefcase, MapPin, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function About() {
  const education = [
    {
      institution: "Vivekananda Global University",
      degree: "Bachelor in Computer Applications (BCA)",
      specialization: "Full Stack and Cloud Computing",
      duration: "Sep 2024 - Jul 2027",
      grade: "9.43 CGPA",
    },
    {
      institution: "A.S. Public Senior Secondary School",
      degree: "12th Grade",
      specialization: "Science (Mathematics)",
      duration: "Completed",
      grade: "96%",
    },
  ];

  const experience = [
    {
      role: "Computer Teacher",
      company: "Anukriti Prakashan",
      type: "Part-time",
      duration: "Mar 2025 - Present",
      location: "Jaipur, Rajasthan, India",
      description:
        "Teaching computer fundamentals and modern technologies to students, developing curriculum materials, and fostering digital literacy.",
    },
    {
      role: "Computer Teacher",
      company: "InfoSphere",
      type: "Part-time",
      duration: "Sep 2024 - Aug 2025",
      location: "Jaipur, Rajasthan, India",
      description:
        "Taught the RS-CIT course, focusing on computer fundamentals and digital literacy. Designed engaging lessons and provided hands-on training.",
    },
    {
      role: "Back End Developer",
      company: "Zenz Aawara",
      type: "Internship",
      duration: "May 2025 - Jul 2025",
      location: "Jaipur, Rajasthan, India (Hybrid)",
      description:
        "Contributed to backend development by designing and optimizing server-side code while building RESTful APIs for effective data management.",
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I am currently pursuing my Bachelor of Computer Applications (BCA),
            where I am building a strong foundation in programming, computer
            science concepts, and modern technologies.
          </p>
        </div>

        {/* Professional Summary */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Professional Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              My academic curriculum has provided me with exposure to
              programming languages such as C, Python, and Java, as well as
              practical knowledge in web development, database management, and
              cloud computing.
            </p>
            <p>
              I am passionate about applying my theoretical knowledge to
              real-world projects. I have gained hands-on experience through
              internships and teaching roles, where I've developed both
              technical expertise and communication skills.
            </p>
            <p>
              I'm actively seeking opportunities to contribute to innovative
              projects, expand my skill set, and grow as a professional in the
              tech industry.
            </p>
          </CardContent>
        </Card>

        {/* Education */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Education</h2>
          </div>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <Card
                key={index}
                className="hover-elevate transition-transform hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        {edu.institution}
                      </h3>
                      <p className="text-muted-foreground">{edu.degree}</p>
                      {edu.specialization && (
                        <p className="text-sm text-muted-foreground">
                          {edu.specialization}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <Badge variant="secondary">{edu.duration}</Badge>
                      <Badge className="bg-chart-2 hover:bg-chart-2">
                        Grade: {edu.grade}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Experience</h2>
          </div>

          <div className="space-y-6">
            {experience.map((exp, index) => (
              <Card
                key={index}
                className="hover-elevate transition-transform hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
                      <p className="text-lg text-muted-foreground mb-1">
                        {exp.company}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <Badge variant="secondary">{exp.duration}</Badge>
                      <Badge variant="outline">{exp.type}</Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Location */}
        <Card className="mt-12 bg-gradient-to-br from-primary/5 to-chart-2/5">
          <CardContent className="p-8 text-center">
            <MapPin className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-2">Based in Jaipur</h3>
            <p className="text-muted-foreground">
              Rajasthan, India • Open to remote and on-site opportunities
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
